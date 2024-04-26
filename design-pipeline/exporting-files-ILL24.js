// Script for Adobe Illustrator to export artboards as PNG and SVG files with a GUI
// Compatible with Adobe Illustrator [version]

// Create the main window
var win = new Window('dialog', 'Export Artboards as PNG and SVG', undefined);
win.orientation = 'column';
win.alignChildren = ['fill', 'center'];

// Add a panel for export options
var exportPanel = win.add('panel', undefined, 'Export Options');
exportPanel.orientation = 'column';
exportPanel.alignChildren = ['fill', 'top'];
exportPanel.spacing = 10;
exportPanel.margins = [10, 20, 10, 10];

// Add a checkbox for PNG export
var pngCheckbox = exportPanel.add('checkbox', undefined, 'Export as PNG');
pngCheckbox.value = true;

// Add a checkbox for SVG export
var svgCheckbox = exportPanel.add('checkbox', undefined, 'Export as SVG');
svgCheckbox.value = true;

// Add a button group for action buttons
var buttonGroup = win.add('group');
buttonGroup.alignment = ['fill', 'bottom'];
buttonGroup.margins = [0, 10, 0, 0];

// Add an export button
var exportButton = buttonGroup.add('button', undefined, 'Export');
exportButton.onClick = function() {
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
    if (!pngFolder.exists && pngCheckbox.value) pngFolder.create();
    if (!svgFolder.exists && svgCheckbox.value) svgFolder.create();

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
        
        // Export artboard as PNG if the checkbox is selected
        if (pngCheckbox.value) {
            var pngFile = new File(pngFolder + '/' + docName + '_' + artboardName + '.png');
            doc.artboards.setActiveArtboardIndex(i);
            doc.exportFile(pngFile, ExportType.PNG24, pngOptions);
            exportedFiles.push({ name: pngFile.name, path: pngFile.fsName });
        }
        
        // Export artboard as SVG if the checkbox is selected
        if (svgCheckbox.value) {
            var svgFile = new File(svgFolder + '/' + docName + '_' + artboardName + '.svg');
            doc.artboards.setActiveArtboardIndex(i);
            doc.exportFile(svgFile, ExportType.SVG, svgOptions);
            exportedFiles.push({ name: svgFile.name, path: svgFile.fsName });
        }
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
};

// Add a cancel button
var cancelButton = buttonGroup.add('button', undefined, 'Cancel');
cancelButton.onClick = function() {
    win.close();
};

// Show the window
win.show();