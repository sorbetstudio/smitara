// Script for Adobe Illustrator to export artboards as PNG and SVG files
// Compatible with Adobe Illustrator [version]

// Get the current active document
var doc = app.activeDocument;

// Get the document name without the file extension
var docName = doc.name.split('.')[0];

// Create folders for exported files
var exportFolder = new Folder(doc.path + '/' + docName + '_export');
var pngFolder = new Folder(exportFolder + '/png');
var svgFolder = new Folder(exportFolder + '/svg');

// Create the folders if they don't exist
if (!exportFolder.exists) exportFolder.create();
if (!pngFolder.exists) pngFolder.create();
if (!svgFolder.exists) svgFolder.create();

// Export options for PNG and SVG
var pngOptions = new ExportOptionsPNG24();
var svgOptions = new ExportOptionsSVG();

// Array to store the exported file information
var exportedFiles = [];

// Loop through each artboard in the document
for (var i = 0; i < doc.artboards.length; i++) {
    var artboard = doc.artboards[i];
    
    // Get the artboard name and replace special characters and spaces with underscores
    var artboardName = artboard.name.replace(/[^a-zA-Z0-9]/g, '_');
    
    // Export artboard as PNG
    var pngFile = new File(pngFolder + '/' + docName + '_' + artboardName + '.png');
    doc.exportFile(pngFile, ExportType.PNG24, pngOptions);
    exportedFiles.push({ name: pngFile.name, path: pngFile.fsName });
    
    // Export artboard as SVG
    var svgFile = new File(svgFolder + '/' + docName + '_' + artboardName + '.svg');
    doc.exportFile(svgFile, ExportType.SVG, svgOptions);
    exportedFiles.push({ name: svgFile.name, path: svgFile.fsName });
}

// Generate a summary report
var reportFile = new File(exportFolder + '/' + docName + '_export_report.txt');
var reportContent = 'Export Summary\n\n';
reportContent += 'Document: ' + doc.name + '\n';
reportContent += 'Export Folder: ' + exportFolder.fsName + '\n\n';
reportContent += 'Exported Files:\n';

for (var j = 0; j < exportedFiles.length; j++) {
    reportContent += (j + 1) + '. ' + exportedFiles[j].name + '\n';
    reportContent += '   Path: ' + exportedFiles[j].path + '\n';
}

// Save the report file
reportFile.open('w');
reportFile.write(reportContent);
reportFile.close();

// Show a completion message
alert('Export completed successfully!\nCheck the "' + exportFolder.fsName + '" folder for the exported files and report.');