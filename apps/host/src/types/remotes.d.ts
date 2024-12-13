type RemoteAppProps = {
  initialPath?: string;
};

declare module 'boApp/Module' {
  const Module: React.ComponentType<RemoteAppProps>;
  export default Module;
}

declare module 'brmApp/Module' {
  const Module: React.ComponentType<RemoteAppProps>;
  export default Module;
}
