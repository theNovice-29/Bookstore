package business.book;

/*
 * book table of your database.
 */

public record Book(
		long bookId,
		String title,
		String author,
		int price,
		boolean isPublic,
		long categoryId,
		int rating,
		String description,
		boolean isFeatured
) {}
