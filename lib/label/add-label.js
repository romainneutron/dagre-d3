var addTextLabel = require("./add-text-label"),
    addHtmlLabel = require("./add-html-label"),
    addSVGLabel  = require("./add-svg-label");

module.exports = addLabel;

function addLabel(root, node, location) {
  var label = node.label;
  var labelSvg = root.append("g"),
      injected, labelBBox, y;

  // Allow the label to be a string, a function that returns a DOM element, or
  // a DOM element itself.
  if (node.labelType === "svg") {
    injected = addSVGLabel(labelSvg, node);
  } else if (typeof label !== "string" || node.labelType === "html") {
    injected = addHtmlLabel(labelSvg, node);
  } else {
    injected = addTextLabel(labelSvg, node);
  }

  if (injected.attr("width") && injected.attr("height")) {
    labelBBox = { width: injected.attr("width"), height: injected.attr("height") };
  } else {
    labelBBox = labelSvg.node().getBBox();
  }

  switch(location) {
    case "top":
      y = (-node.height / 2);
      break;
    case "bottom":
      y = (node.height / 2) - labelBBox.height;
      break;
    default:
      y = (-labelBBox.height / 2);
  }
  labelSvg.attr("transform",
                "translate(" + (-labelBBox.width / 2) + "," + y + ")");

  return labelSvg;
}
