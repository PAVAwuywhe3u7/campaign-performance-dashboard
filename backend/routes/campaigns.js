const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { channel, startDate, endDate, page = 1, limit = 10 } = req.query;
    
    // Build query object
    let query = {};
    
    // Filter by channel
    if (channel) {
      query.channel = channel;
    }
    
    // Filter by date range
    if (startDate || endDate) {
      query.startDate = {};
      if (startDate) {
        query.startDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.startDate.$lte = new Date(endDate);
      }
    }

    // Execute query with pagination
    const campaigns = await Campaign.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count for pagination
    const total = await Campaign.countDocuments(query);

    res.status(200).json({
      success: true,
      count: campaigns.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      },
      data: campaigns
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single campaign
// @route   GET /api/campaigns/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }

    res.status(200).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new campaign
// @route   POST /api/campaigns
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const campaign = await Campaign.create(req.body);

    res.status(201).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update campaign
// @route   PUT /api/campaigns/:id
// @access  Public
router.put('/:id', async (req, res, next) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }

    res.status(200).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete campaign
// @route   DELETE /api/campaigns/:id
// @access  Public
router.delete('/:id', async (req, res, next) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get campaign analytics
// @route   GET /api/campaigns/analytics/summary
// @access  Public
router.get('/analytics/summary', async (req, res, next) => {
  try {
    const { channel, startDate, endDate } = req.query;
    
    let matchStage = {};
    if (channel) matchStage.channel = channel;
    if (startDate || endDate) {
      matchStage.startDate = {};
      if (startDate) matchStage.startDate.$gte = new Date(startDate);
      if (endDate) matchStage.startDate.$lte = new Date(endDate);
    }

    const analytics = await Campaign.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalCampaigns: { $sum: 1 },
          totalBudget: { $sum: '$budget' },
          totalClicks: { $sum: '$clicks' },
          totalImpressions: { $sum: '$impressions' },
          totalConversions: { $sum: '$conversions' },
          avgCTR: { 
            $avg: { 
              $cond: [
                { $eq: ['$impressions', 0] },
                0,
                { $multiply: [{ $divide: ['$clicks', '$impressions'] }, 100] }
              ]
            }
          },
          avgCPC: {
            $avg: {
              $cond: [
                { $eq: ['$clicks', 0] },
                0,
                { $divide: ['$budget', '$clicks'] }
              ]
            }
          }
        }
      }
    ]);

    const summary = analytics[0] || {
      totalCampaigns: 0,
      totalBudget: 0,
      totalClicks: 0,
      totalImpressions: 0,
      totalConversions: 0,
      avgCTR: 0,
      avgCPC: 0
    };

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
