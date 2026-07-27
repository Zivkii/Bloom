'use client';

import { Component, type ReactNode } from 'react';

/** Fångar renderings-/effektfel (t.ex. om kartan inte kan initieras). */
export default class ErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
