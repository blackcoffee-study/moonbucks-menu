export class Router {
  constructor() {
    window.addEventListener('hashchange', this.route.bind(this));

    this.routeTable = [];
    this.defaultRoute = null;
  }

  setDefaultPage(page) {
    this.defaultRoute = { path: '', page };
  }

  addRoutePath(path, page) {
    this.routeTable.push({
      path,
      page,
    });
  }

  route() {
    const routePath = location.hash;

    if (routePath === '' && this.defaultRoute) {
      this.defaultRoute.page.render();
      return;
    }

    for (const routeInfo of this.routeTable) {
      if (routePath.includes(routeInfo.path)) {
        routeInfo.page.clearEvents();
        routeInfo.page.render();
        break;
      }
    }
  }
}
