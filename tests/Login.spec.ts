import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('debe iniciar sesión con credenciales válidas', async ({ page }) => {
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');

    await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });

  test('debe mostrar el botón de login en la página inicial', async ({ page }) => {
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});