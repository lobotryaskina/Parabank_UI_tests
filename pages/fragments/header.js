const SearchPage = require("../search-page");
const LoginPage = require("../login-page");

class Header {
    constructor(page) {
        this.page = page;
        this.root = page.locator('[class*=tm-base-layout__header_is-sticky]')
        this._searchBtn = page.locator('[class*=tm-header-user-menu__search]');
        this._userMenu = page.locator('[class*=tm-dropdown__head]').first();
        this._pageSettingsBtn = page.locator('[class*=tm-user-menu__menu-link_grey]');
        this._loginBtninMenu = page.locator('[class*=tm-user-menu__auth-button]').nth(1)
    }

    async clickSearchBtn() {
        await this._searchBtn.click();
        return new SearchPage(this.page);
    }

    async openPageSettingMenu() {
        await this._userMenu.click()
        await this._pageSettingsBtn.click()
    }

    async clickLoginBtn() {
        await this._userMenu.click();
        await this._loginBtninMenu.click();
        return new LoginPage(this.page);
    };
}

module.exports = Header;
