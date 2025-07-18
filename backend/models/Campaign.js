const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  campaignName: {
    type: String,
    required: [true, 'Campaign name is required'],
    trim: true,
    maxlength: [100, 'Campaign name cannot exceed 100 characters']
  },
  channel: {
    type: String,
    required: [true, 'Channel is required'],
    enum: ['Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'Email', 'Display', 'Other'],
    default: 'Other'
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    min: [0, 'Budget cannot be negative']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  clicks: {
    type: Number,
    required: [true, 'Clicks is required'],
    min: [0, 'Clicks cannot be negative'],
    default: 0
  },
  impressions: {
    type: Number,
    required: [true, 'Impressions is required'],
    min: [0, 'Impressions cannot be negative'],
    default: 0
  },
  conversions: {
    type: Number,
    required: [true, 'Conversions is required'],
    min: [0, 'Conversions cannot be negative'],
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual fields for calculated metrics
campaignSchema.virtual('ctr').get(function() {
  if (this.impressions === 0) return 0;
  return ((this.clicks / this.impressions) * 100).toFixed(2);
});

campaignSchema.virtual('cpc').get(function() {
  if (this.clicks === 0) return 0;
  return (this.budget / this.clicks).toFixed(2);
});

campaignSchema.virtual('roi').get(function() {
  if (this.budget === 0) return 0;
  return (((this.conversions * 100 - this.budget) / this.budget) * 100).toFixed(2);
});

// Index for better query performance
campaignSchema.index({ channel: 1 });
campaignSchema.index({ startDate: 1, endDate: 1 });
campaignSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Campaign', campaignSchema);
