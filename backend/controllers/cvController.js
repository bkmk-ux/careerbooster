const express = require("express");
const CV = require("../models/CV");
//--------------------------------
//   CREATE CV CONTROLLER
//--------------------------------

const createCvController = async (req, res) => {
  try {
    const {
      userId,
      fullName,
      email,
      phone,
      skills,
      education,
      experience,
      summary,
    } = req.body;

    const cv = await CV.create({
      userId,
      fullName,
      email,
      phone,
      skills,
      education,
      experience,
      summary,
    });

    res.status(201).json(cv);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//--------------------------------
//   GET CV CONTROLLER
//--------------------------------

const getCvController = async (req, res) => {
  try {
    const cv = await CV.findOne({
      userId: req.params.userId,
    });

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

    res.json(cv);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { createCvController, getCvController };
