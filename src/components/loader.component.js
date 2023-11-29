export class Loader {
  constructor() {
    this.loader = this.createLoader();

    this.show();
  }
  createLoader() {
    const loaderString = `
        <div class="loader-wrapper">
            <div class="loader"></div>
        </div>
    `;
    const parser = new DOMParser();
    return parser.parseFromString(loaderString, 'text/html').body.firstChild;
  }

  show() {
    document.body.append(this.loader);
  }

  hide() {
    this.loader.remove();
  }
}
