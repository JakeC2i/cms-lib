import { Injectable } from '@angular/core';

/**
 * You must provide this service yourself
 */
@Injectable()
export class StylesLazyLoaderService {

  private _hrefsLoaded: string[] = [];
  private _outlet: Node;

  private _initialize() {

    const headChildNodes = Array.from(document.childNodes);
    const loadedLinks: HTMLLinkElement[] = headChildNodes
      .filter(node => node.nodeType === 1 && (node as HTMLElement).tagName === 'LINK') as HTMLLinkElement[];

    this._hrefsLoaded = loadedLinks.map(link => link.href);
    this._outlet = loadedLinks[loadedLinks.length-1] || headChildNodes[headChildNodes.length - 1];
  }

  private _loadStyleFromUrl(url: string) {
    let link = document.createElement('link') as HTMLLinkElement;
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = (e: Event) => {
      this._hrefsLoaded.push(url);
    };
    link.onerror = (e: Event) => {
      // TODO rethink
      console.warn('URL with style loading error: ', url, e);
    };
    document.head.appendChild(link);
  }

  constructor() {
    this._initialize();
  }

  loadStyleFromUrls(urls: string[]) {
    urls.forEach(url => {
      if (this._hrefsLoaded.indexOf(url) !== -1) return;
      this._loadStyleFromUrl(url);
    })
  }
}
