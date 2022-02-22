import { NavigationClient as BaseNavigationClient, NavigationOptions } from "@azure/msal-browser";
import { NextRouter } from "next/dist/client/router";

export class NavigationClient extends BaseNavigationClient {
  public readonly router: NextRouter;

  constructor(router: NextRouter) {
    super();
    this.router = router;
  }

  /**
   * Navigate to other pages with the integrated router
   *
   * @param url new url
   *
   * @param options redirect options
   *
   * @returns Promise<boolean>
   */

  public async navigateInternal(url: string, options: NavigationOptions): Promise<boolean> {
    const relativePath = url.replace(window.location.origin, "");
    if (options.noHistory) {
      this.router.replace(relativePath);
    } else {
      this.router.push(relativePath);
    }

    return false;
  }
}
