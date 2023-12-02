package business.order;

import api.ApiException;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.CustomerForm;

import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.List;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		// NOTE: THIS METHOD PROVIDED NEXT PROJECT
		return null;
	}

	@Override
	public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		// NOTE: MORE CODE PROVIDED NEXT PROJECT

		return -1;
	}

	private void validateCustomer(CustomerForm customerForm) {
		String name = customerForm.getName();
		String address = customerForm.getAddress();
		String phone = customerForm.getPhone();
		String email = customerForm.getEmail();
		String ccNumber = customerForm.getCcNumber();
		String ccExpiryMonth = customerForm.getCcExpiryMonth();
		String ccExpiryYear = customerForm.getCcExpiryYear();


		if (name == null || name.trim().isEmpty() || name.length() < 4 || name.length() > 45) {
			throw new ApiException.ValidationFailure("name", "Invalid name field");
		}


		if (address == null || address.trim().isEmpty() || address.length() < 4 || address.length() > 45) {
			throw new ApiException.ValidationFailure("address", "Invalid address field");
		}


		String formattedPhone = phone.replaceAll("[^0-9]", "");
		if (formattedPhone.length() != 10) {
			throw new ApiException.ValidationFailure("phone", "Invalid phone number");
		}


		if (!email.matches("^[^\\s]+@[^\\.\\s]+\\.[^\\s]+$") || email.endsWith(".")) {
			throw new ApiException.ValidationFailure("email", "Invalid email address");
		}


		String formattedCCNumber = ccNumber.replaceAll("[^0-9]", "");
		if (formattedCCNumber.length() < 14 || formattedCCNumber.length() > 16) {
			throw new ApiException.ValidationFailure("ccNumber", "Invalid credit card number");
		}


		if (expiryDateIsInvalid(ccExpiryMonth, ccExpiryYear)) {
			throw new ApiException.ValidationFailure("Please enter a valid expiration date");
		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {
		try {
			int month = Integer.parseInt(ccExpiryMonth);
			int year = Integer.parseInt(ccExpiryYear);
			YearMonth expirationDate = YearMonth.of(year, month);
			YearMonth currentMonth = YearMonth.now();

			return expirationDate.isBefore(currentMonth);
		} catch (NumberFormatException | DateTimeException e) {
			return true;
		}
	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 0 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}

			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (databaseBook == null) {
				throw new ApiException.ValidationFailure("Book not found with ID: " + item.getBookId());
			}

			if (item.getBookForm().getPrice() != databaseBook.price()) {
				throw new ApiException.ValidationFailure("Price mismatch for book with ID: " + item.getBookId());
			}

			if (item.getBookForm().getCategoryId() != databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure("Category mismatch for book with ID: " + item.getBookId());
			}
		});
	}
}