import React, { useEffect, useState } from "react";

var cv = require("opencv.js");
class DocumentScan {
  constructor() {
    // Khởi tạo constructor (nếu cần)
  }

  static async resizer(image, width = 500) {
    const height = Math.round((image.rows / image.cols) * width);
    const size = new cv.Size(width, height);

    const resizedImage = new cv.Mat();
    cv.resize(image, resizedImage, size, 0, 0, cv.INTER_AREA);

    return { image: resizedImage, size };
  }

  static applyBrightnessContrast(inputImg, brightness = 0, contrast = 0) {
    let buf = new cv.Mat();
    inputImg.copyTo(buf);

    if (brightness !== 0) {
      let shadow, highlight;

      if (brightness > 0) {
        shadow = brightness;
        highlight = 255;
      } else {
        shadow = 0;
        highlight = 255 + brightness;
      }

      const alphaB = (highlight - shadow) / 255;
      const gammaB = shadow;
      cv.addWeighted(inputImg, alphaB, inputImg, 0, gammaB, buf);
    }

    if (contrast !== 0) {
      const f = (131 * (contrast + 127)) / (127 * (131 - contrast));
      const alphaC = f;
      const gammaC = 127 * (1 - f);
      cv.addWeighted(buf, alphaC, buf, 0, gammaC, buf);
    }

    return buf;
  }

  async documentScanner(imagePath) {
    const { cv, loadOpenCv } = await window.cvPromise;
    await loadOpenCv();

    const image = await cv.imreadAsync(imagePath);
    const { image: resizedImage, size } = await this.resizer(image);

    cv.imwrite(resizedImage);

    try {
      const detail = new cv.Mat();
      cv.detailEnhance(resizedImage, detail, 20, 0.15);

      const gray = new cv.Mat();
      cv.cvtColor(detail, gray, cv.COLOR_BGR2GRAY);

      const blur = new cv.Mat();
      cv.GaussianBlur(gray, blur, new cv.Size(5, 5), 0);

      // Edge detect
      const edgeImage = new cv.Mat();
      cv.Canny(blur, edgeImage, 75, 200);

      // Morphological transform
      const kernel = new cv.Mat.ones(5, 5, cv.CV_8U);
      const dilate = new cv.Mat();
      cv.dilate(
        edgeImage,
        dilate,
        kernel,
        new cv.Point(-1, -1),
        1,
        cv.BORDER_CONSTANT,
        cv.morphologyDefaultBorderValue()
      );

      const closing = new cv.Mat();
      cv.morphologyEx(dilate, closing, cv.MORPH_CLOSE, kernel);

      // Find the contours
      const contours = new cv.MatVector();
      const hire = new cv.Mat();
      cv.findContours(
        closing,
        contours,
        hire,
        cv.RETR_LIST,
        cv.CHAIN_APPROX_SIMPLE
      );

      contours.sort(
        (contour1, contour2) =>
          cv.contourArea(contour2) - cv.contourArea(contour1)
      );

      for (let i = 0; i < contours.size(); ++i) {
        const contour = contours.get(i);
        const peri = cv.arcLength(contour, true);
        const approx = new cv.Mat();
        cv.approxPolyDP(contour, approx, 0.02 * peri, true);

        if (approx.size().height === 4) {
          const fourPoints = approx.data32F;
          const fourPointsArray = [];
          for (let j = 0; j < fourPoints.length; j += 2) {
            fourPointsArray.push({ x: fourPoints[j], y: fourPoints[j + 1] });
          }
          approx.delete();
          return { fourPoints: fourPointsArray, size };
        }

        approx.delete();
      }

      hire.delete();
    } catch (error) {
      console.error(error);
      return { fourPoints: null, size };
    } finally {
      image.delete();
    }
  }

  calibrateToOriginalSize(fourPoints, size) {
    const multiplier = this.image.shape[1] / size[0];
    const fourPointsOrig = fourPoints.map(({ x, y }) => ({
      x: x * multiplier,
      y: y * multiplier,
    }));

    const fourPointsMat = new cv.Mat(fourPointsOrig.length, 1, cv.CV_32FC2);
    fourPointsMat.data32F.set(fourPointsOrig.flat());

    const wrapImage = new cv.Mat();
    cv.warpPerspective(
      this.image,
      wrapImage,
      cv.getPerspectiveTransform(this.image.size(), fourPointsMat),
      this.image.size(),
      cv.INTER_LINEAR,
      cv.BORDER_CONSTANT,
      new cv.Scalar()
    );

    // Apply magic color to wrap image
    const magicColor = this.applyBrightnessContrast(wrapImage, 40, 60);

    fourPointsMat.delete();
    wrapImage.delete();
    return magicColor;
  }
}

export default DocumentScan;
