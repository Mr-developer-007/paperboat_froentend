"use client";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// IMPORTANT: local worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PdfViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
    setError(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF Error:", error);
    setLoading(false);
    setError(true);
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  const resetZoom = () => {
    setScale(1);
  };

  const previousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setPageNumber((prev) =>
      Math.min(prev + 1, numPages || 1)
    );
  };

  return (
    <div className="w-full">
      {/* PDF TOOLBAR */}
      <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b bg-white px-4 py-3 shadow-sm">
        
        {/* Previous / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <div className="min-w-[80px] text-center text-sm font-semibold">
            {pageNumber} / {numPages || "-"}
          </div>

          <button
            onClick={nextPage}
            disabled={!numPages || pageNumber >= numPages}
            className="rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="h-9 w-9 rounded-lg border text-lg font-semibold hover:bg-gray-100"
          >
            −
          </button>

          <button
            onClick={resetZoom}
            className="min-w-[60px] rounded-lg border px-2 py-2 text-sm font-medium hover:bg-gray-100"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            onClick={zoomIn}
            className="h-9 w-9 rounded-lg border text-lg font-semibold hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* PDF AREA */}
      <div
        className="relative min-h-[700px] overflow-auto bg-gray-100 p-4 md:p-8"
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Loading */}
        {loading && !error && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="rounded-xl bg-white px-6 py-4 shadow">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
                <span className="text-sm font-medium">
                  Loading PDF...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error ? (
          <div className="flex min-h-[600px] items-center justify-center">
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <div className="mb-3 text-4xl">📄</div>

              <h2 className="text-lg font-semibold">
                Unable to load PDF
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Please try refreshing the page.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="overflow-hidden rounded-sm shadow-xl"
              />
            </Document>
          </div>
        )}
      </div>

      {/* BOTTOM PAGINATION */}
      {!error && numPages > 0 && (
        <div className="flex items-center justify-center gap-4 border-t bg-white px-4 py-4">
          <button
            onClick={previousPage}
            disabled={pageNumber <= 1}
            className="rounded-lg border px-5 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-40"
          >
            Previous
          </button>

          <span className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold">
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={nextPage}
            disabled={pageNumber >= numPages}
            className="rounded-lg border px-5 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;