import React from "react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

export default function MarkDownRenderer({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown components={ChakraUIRenderer()}>{markdown}</ReactMarkdown>
  );
}
