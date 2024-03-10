package business;

import business.book.BookDao;
import business.book.BookDaoJdbc;
import business.category.CategoryDao;
import business.category.CategoryDaoJdbc;
import business.customer.CustomerDao;
import business.customer.CustomerDaoJdbc;
import business.order.*;

public class ApplicationContext {

    private final CategoryDao categoryDao;
    private final BookDao bookDao;
    private final OrderService orderService;
    private final OrderDao orderDao;
    private final LineItemDao lineItemDao;
    private final CustomerDao customerDao;

    public static final ApplicationContext INSTANCE = new ApplicationContext();

    private ApplicationContext() {
        categoryDao = new CategoryDaoJdbc();
        bookDao = new BookDaoJdbc();
        customerDao = new CustomerDaoJdbc();
        orderDao = new OrderDaoJdbc();
        lineItemDao = new LineItemDaoJdbc();

        orderService = new DefaultOrderService(bookDao, orderDao, customerDao, lineItemDao);
    }

    public CategoryDao getCategoryDao() {
        return categoryDao;
    }

    public BookDao getBookDao() {
        return bookDao;
    }

    public OrderService getOrderService() {
        return orderService;
    }

    public OrderDao getOrderDao() {
        return orderDao;
    }

    public LineItemDao getLineItemDao() {
        return lineItemDao;
    }

    public CustomerDao getCustomerDao() {
        return customerDao;
    }
}
