class Fabric {
  constructor() {
    this.SVG_NS = "http://www.w3.org/2000/svg";
    this.XLINK_NS = "http://www.w3.org/1999/xlink";
    this.svgTags = new Set([
      "svg", "use", "path", "circle", "rect", "g", "line", "polygon", "polyline",
      "ellipse", "defs", "clipPath", "pattern", "mask", "text"
    ]);
  }

  createElement(tag, options = {}) {
    const isSvg = this.svgTags.has(tag);
    const el = isSvg
      ? document.createElementNS(this.SVG_NS, tag)
      : document.createElement(tag);

    if (options.attrs) {
      for (const [key, value] of Object.entries(options.attrs)) {
        if (key === "xlink:href") {
          el.setAttributeNS(this.XLINK_NS, key, value);
        } else {
          el.setAttribute(key, value);
        }
      }
    }

    if (options.classes) {
      el.classList.add(...options.classes);
    }

    if (options.on) {
      for (const [event, handler] of Object.entries(options.on)) {
        el.addEventListener(event, handler);
      }
    }

    if (options.onClick) {
      el.addEventListener("click", options.onClick);
    }

    if (options.content) {
      if (Array.isArray(options.content)) {
        options.content.forEach((child) => this._appendContent(el, child));
      } else {
        this._appendContent(el, options.content);
      }
    }

    return el;
  }

  _appendContent(parent, child) {
    if (typeof child === "string") {
      parent.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement || child instanceof SVGElement) {
      parent.appendChild(child);
    } else if (typeof child === "object" && child.tag) {
      parent.appendChild(this.createElement(child.tag, child));
    }
  }

  append(parent, child) {
    this._appendContent(parent, child);
    return parent;
  }

  prepend(parent, child) {
    let nodeToInsert;

    if (typeof child === "string") {
      nodeToInsert = document.createTextNode(child);
    } else if (child instanceof HTMLElement || child instanceof SVGElement) {
      nodeToInsert = child;
    } else if (typeof child === "object" && child.tag) {
      nodeToInsert = this.createElement(child.tag, child);
    }

    parent.insertBefore(nodeToInsert, parent.firstChild);
    return parent;
  }
}

export const fabric = new Fabric();
