package com.laclac.repository;

import com.laclac.entity.Order;
import com.laclac.entity.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Integer> {
    List<OrderHistory> getAllByOrderId(Integer orderId);
//    @Query(value = "SELECT * from orders o \n" +
//            "WHERE EXISTS (SELECT * from order_history oh WHERE oh.order_id = o.id)", nativeQuery = true)
    @Query(value = "select o from Order  o where exists (select o from OrderHistory oh where o.id = oh.order.id) and o.createBy.username = :username")
    List<Order> getAllOrderReturnByUsername(String username);

}
