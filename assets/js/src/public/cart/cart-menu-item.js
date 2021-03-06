/**
 * @module Cart Menu Item
 * @description Handle cart item count for WordPress menu item.
 */

import Cookies from 'js-cookie';
import _ from 'lodash';
import * as tools from '../../utils/tools';
import { CART_ITEM_COUNT_COOKIE } from '../../constants/cookies';

const cartMenuSet = itemCount => Cookies.set(CART_ITEM_COUNT_COOKIE, itemCount);

const updateCartMenuItem = () => {
	const currentCount = Cookies.get(CART_ITEM_COUNT_COOKIE);
	tools.getNodes('.bigcommerce-cart__item-count', true, document, true).forEach((item) => {
		item.classList.remove('full');

		if (!currentCount || currentCount <= 0) {
			item.innerHTML = '';
			return;
		}

		_.delay(() => {
			item.classList.add('full');
		}, 150);

		item.innerHTML = currentCount;
	});
};

const updateMenuQtyTotal = (data = {}) => {
	const totalQty = [];

	Object.values(data.items).forEach((value) => {
		const itemQty = value.quantity;
		totalQty.push(itemQty);
	});

	cartMenuSet(totalQty.reduce((prev, next) => prev + next, 0));

	updateCartMenuItem();
};

const updateMenuQtyOnPageLoad = () => {
	const cookie = Cookies.get(CART_ITEM_COUNT_COOKIE);

	if (!cookie) {
		return;
	}

	updateCartMenuItem();

	if (cookie !== Cookies.get(CART_ITEM_COUNT_COOKIE)) {
		cartMenuSet(cookie);
		updateCartMenuItem();
		_.delay(() => {
			Cookies.remove(CART_ITEM_COUNT_COOKIE);
		}, 100);
	}
};

export { cartMenuSet, updateMenuQtyTotal, updateMenuQtyOnPageLoad, updateCartMenuItem };
