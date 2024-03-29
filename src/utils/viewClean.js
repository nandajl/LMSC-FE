import  html2pdf  from "html2pdf.js";
import React from "react";

export function cleanDateTime(datetimeStr) {
  const datetime = new Date(datetimeStr);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric' };
  const dateStr = datetime.toLocaleDateString(undefined, dateOptions);
  const timeStr = datetime.toLocaleTimeString(undefined, timeOptions);
  return `${dateStr} ${timeStr}`;
}

export function makeExcerpt(text, maxLength) {
  if (text.length > maxLength) {
    const truncatedText = text.substring(0, maxLength - 3) + '...';
    return React.createElement('div', { dangerouslySetInnerHTML: { __html: truncatedText } });
  }
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: text } });
}

export function getFormattedFileName(filename) {
  const nameWithoutExtension = filename.split(".")[0];
  const nameParts = nameWithoutExtension.split("-");
  const formattedName = nameParts.slice(3).join(" ");
  return formattedName;
}

export function printTableToPdf(id, name) {
  const tableElement = document.getElementById(id);
  const options = {
    filename: `${name}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  return html2pdf().set(options).from(tableElement).save();
};