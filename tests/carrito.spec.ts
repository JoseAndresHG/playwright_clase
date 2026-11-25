import { test, expect } from '@playwright/test';

const username = process.env.APP_USER || '';
const password = process.env.APP_PASSWORD || '';

test('agregar producto al carrito', async ({ page }) => {  
  await page.goto('/');

  // 2. Iniciar sesión
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Agregar producto usando data-test
  const addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await addToCartBtn.click();

  // 4. Validar el contador del carrito
  const badge = page.locator('xpath=//span[@class="shopping_cart_badge"]');
  await expect(badge).toBeVisible();
  await expect(badge).toHaveText('1');
});