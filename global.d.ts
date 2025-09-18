declare namespace JSX {
  interface IntrinsicElements {
    "mux-player": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      streamType?: "on-demand" | "live";
      playbackId?: string;
      poster?: string;
      metadataVideoTitle?: string;
      primaryColor?: string;
      secondaryColor?: string;
      autoplay?: boolean;
      muted?: boolean;
      playsinline?: boolean;
      loop?: boolean;
      controls?: boolean;
      noHotKeys?: boolean
      // you can add more attributes from Mux docs as needed
    };
  }
}
