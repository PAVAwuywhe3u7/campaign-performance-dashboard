# Testing Guide

## Manual Testing Checklist

### 🧪 Campaign Management
- [ ] **Create Campaign**: Fill out the form and create a new campaign
- [ ] **Edit Campaign**: Click edit button and modify campaign details
- [ ] **Delete Campaign**: Click delete button and confirm deletion
- [ ] **Form Validation**: Try submitting invalid data (empty fields, invalid dates, negative numbers)

### 📊 Dashboard Features
- [ ] **Stats Cards**: Verify all statistics are calculated correctly
- [ ] **Charts Display**: Check that all three charts render properly
- [ ] **Responsive Design**: Test on different screen sizes

### 🔍 Filtering & Search
- [ ] **Channel Filter**: Filter campaigns by different channels
- [ ] **Date Range Filter**: Set start and end dates to filter campaigns
- [ ] **Quick Date Ranges**: Test "Last 7 days", "Last 30 days", etc.
- [ ] **Search**: Search for campaigns by name
- [ ] **Clear Filters**: Clear all filters and verify all campaigns show

### 📈 Data Visualization
- [ ] **Line Chart**: Impressions over time displays correctly
- [ ] **Bar Chart**: CTR comparison shows top performing campaigns
- [ ] **Pie Chart**: Budget distribution by channel is accurate
- [ ] **Chart Interactions**: Hover over chart elements for tooltips

### 💾 Data Export
- [ ] **CSV Export**: Click export button and verify CSV file downloads
- [ ] **CSV Content**: Open CSV and verify all data is present and formatted correctly

### 🎨 User Experience
- [ ] **Loading States**: Verify loading spinners appear during data operations
- [ ] **Error Handling**: Test error scenarios (network issues, invalid data)
- [ ] **Form UX**: Check form validation messages and user feedback
- [ ] **Mobile Responsive**: Test on mobile devices or browser dev tools

## Automated Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests (if implemented)
```bash
cd backend
npm test
```

## Performance Testing

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for Performance, Accessibility, Best Practices, SEO

### Expected Scores
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Test Scenarios
- [ ] Campaign CRUD operations work in all browsers
- [ ] Charts render correctly in all browsers
- [ ] Responsive design works on all screen sizes
- [ ] Form validation works consistently

## API Testing

### Using curl or Postman

1. **Health Check**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Get All Campaigns**
   ```bash
   curl http://localhost:5000/api/campaigns
   ```

3. **Create Campaign**
   ```bash
   curl -X POST http://localhost:5000/api/campaigns \
     -H "Content-Type: application/json" \
     -d '{
       "campaignName": "Test Campaign",
       "channel": "Google Ads",
       "budget": 1000,
       "startDate": "2024-01-01",
       "endDate": "2024-01-31",
       "clicks": 100,
       "impressions": 5000,
       "conversions": 10
     }'
   ```

## Common Issues & Solutions

### Frontend Issues
- **Charts not rendering**: Check if Chart.js is properly imported
- **Tailwind styles not working**: Verify tailwind.config.js and CSS imports
- **API calls failing**: Check REACT_APP_API_URL environment variable

### Backend Issues
- **MongoDB connection failed**: Verify MONGODB_URI in .env file
- **CORS errors**: Check CORS configuration in server.js
- **Validation errors**: Check Mongoose schema definitions

### Development Issues
- **Port conflicts**: Change ports in package.json scripts if needed
- **Module not found**: Run `npm install` in both frontend and backend directories
- **Build failures**: Check for TypeScript errors and fix them

## Test Data

The application includes sample data for testing. You can:
1. Use the mock API (default) for immediate testing
2. Connect to MongoDB and create your own test data
3. Import the sample data into your MongoDB instance

## Reporting Issues

When reporting issues, please include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser and version
5. Console errors (if any)
6. Screenshots (if applicable)
