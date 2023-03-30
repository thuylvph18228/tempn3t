package com.laclac.repository;
import com.laclac.entity.Order;
import com.laclac.entity.OrderStatus;
import com.laclac.entity.OrderType;
import com.laclac.entity.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("select o from Order o order by o.createdDate desc ")
    Page<Order> findAll(Pageable pageable);

    Page<Order> findAllByStatusOrderByCreatedDateDesc(OrderStatus status, Pageable pageable);

    @Query("SELECT o FROM Order o WHERE o.createBy.username = :userName AND o.orderType = :orderType order by o.createdDate desc ")
    List<Order> findAllByUserName(String userName, OrderType orderType);

    @Query(value = "select * from orders where code like :name% or phone like :name% or customer_name like :name%", nativeQuery = true)
    List<Order> findAllBy(String name);

    @Query(value = "SELECT * from orders o \n" +
            "WHERE EXISTS (SELECT * from order_history oh WHERE oh.order_id = o.id AND oh.status LIKE :status )", nativeQuery = true)
    List<Order> getAllOrderReturn(String status);

    @Query("select count(e.id) from Order e where function('month', e.createdDate) = function('month', function('now'))")
    long countByMonth();


    //thống kê số lượng đơn hàng các tháng theo năm
    @Query(value = "SELECT MONTH(created_date) as month, COUNT(id) as total FROM orders \n" +
            "WHERE YEAR(created_date) = :year \n" +
            "GROUP BY MONTH(created_date) \n" +
            "ORDER BY MONTH(created_date) ASC", nativeQuery = true)
    List<Object> countOrder(String year);

    // thống kê doanh thu các tháng
    @Query(value = "SELECT MONTH(o.created_date) as month, SUM(od.quantity * od.price) as total FROM orders o INNER JOIN order_details od on o.id = od.order_id \n" +
            "WHERE YEAR(created_date) = :year \n" +
            "GROUP BY MONTH(o.created_date)\n" +
            "ORDER BY MONTH(created_date) ASC", nativeQuery = true)
    List<Object> turnover(String year);

    //thống kê số lượng đơn hàng theo khoản thời gian
    @Query(value = "SELECT MONTH(o.created_date) as month, SUM(od.quantity * od.price) as total FROM orders o INNER JOIN order_details od on o.id = od.order_id\n" +
            "WHERE CONVERT(created_date, date) >= CONVERT(:begin, date) and CONVERT(created_date, date) <= CONVERT(:end, date)\n" +
            "GROUP BY MONTH(o.created_date)\n" +
            "ORDER BY MONTH(created_date) ASC", nativeQuery = true)
    List<Object> countOrderByTime(String begin, String end);

    @Query("select count(e.id) from Order e where e.status = 'WAIT_FOR_CONFIRMATION'")
    long countByCONFIRMATION();

    @Query("select count(e.id) from Order e where e.status = 'DELIVERED'")
    long countByDELIVERED();

    @Query("select count(e.id) from Order e where e.status = 'CONFIRMED'")
    long countByCONFIRMED();

    @Query(value = "select SUM(order_details.quantity) \n" +
            "from order_details,orders \n" +
            "where (order_details.order_id = orders.id) \n" +
            "and order_details.order_id IN \n" +
            "(select orders.id \n" +
            "from orders \n" +
            "where orders.status= 'DELIVERED');", nativeQuery = true)
    Long countByDaBan();

    @Query(value = "SELECT * FROM orders WHERE CONVERT(created_date, date) >= CONVERT(:beginDate, date) and CONVERT(created_date, date) <= CONVERT(:endDate, date)", nativeQuery = true)
    List<Order> findByTime(String beginDate, String endDate);

    @Query(value = "SELECT * FROM orders o\n" +
            "WHERE(\n" +
            "    SELECT SUM(od.quantity * od.price) AS totalMoney FROM order_details od\n" +
            "    GROUP BY od.order_id\n" +
            "    HAVING o.id = od.order_id AND totalMoney >= :totalBegin AND totalMoney <= :totalEnd \n" +
            ")", nativeQuery = true)
    List<Order> getOrderByTotalMoney(String totalBegin, String totalEnd);

    //thống kê số lượng đơn hàng từng ngày trong tháng hiện tại
    @Query(value = "select DAY(o.created_date), COUNT(o.id) from orders o \n" +
            "where MONTH(o.created_date) = :month and YEAR(o.created_date) = :year \n" +
            "GROUP BY DAY(o.created_date) ", nativeQuery = true)
    List<Object> countInDay(String month, String year);

}

