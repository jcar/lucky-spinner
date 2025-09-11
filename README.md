# Lucky Spinner

A web-based spinning wheel application for making random selections from uploaded data. Perfect for raffles, team selections, or any situation where you need fair random choice.

## Features

- Upload Excel files (.xlsx/.xls) with participant names and weights
- Interactive spinning wheel with smooth animations
- Weighted selection (some participants can have higher chances)
- Track selected winners
- Export results to CSV
- Reset functionality to start fresh

## How to Use

1. **Upload Data**: Click the upload area and select your Excel file
   - Column A: Participant names
   - Column B: Number of entries (weight)

2. **Spin the Wheel**: Click "SPIN THE WHEEL!" to make a selection

3. **View Results**: Winners appear in the right panel with selection details

4. **Export Data**: Download your winners list as a CSV file

5. **Reset**: Start over with all original participants

## Excel File Format

Your Excel file should look like this:

```
Name            | Occurrences
----------------|------------
John Smith      | 1
Sarah Johnson   | 3
Mike Wilson     | 2
```

The "Occurrences" column determines how many times that person's name appears in the wheel (higher number = better odds).

## Development

Built with React, TypeScript, and Vite. Processes Excel files client-side using the XLSX library.

### Local Development

```bash
npm install
npm run dev
```

### Deployment

The app is deployed on Vercel as a static site. All processing happens in the browser - no backend required.

## Technical Notes

- Data is stored locally in your browser session
- No data is sent to external servers
- Files are processed entirely on your device
- Winners list resets when you refresh the page
