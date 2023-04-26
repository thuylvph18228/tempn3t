package com.n3t.repository;

import com.n3t.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
//    @Query("SELECT o FROM Product o WHERE o.brand.id =: brandId AND o.ca")
//    Product findByAll()

//    @Query(value = "select * from products where name like :name%", nativeQuery = true)
//    List<Product> findByName(String name);
    Page<Product> findByNameStartingWith(String name, Pageable pageable);

    List<Product> findByBrandId(Integer brandId);
    List<Product> findByCategoryId(Integer categoryId);



    @Query("select count(id) from Product ")
    long countById();

    /**
     * Nhật ĐẸP ZAI LÀM
     * @param pageable
     * @param formPrice
     * @param toPrice
     * @return
     */

    @Query(value = "select distinct e from Product e " +
            "left JOIN ProductDetail o ON e.id = o.product.id " +
            "where ((:color is null) or (o.color.id = :color)) " +
            "and ((:formPrice is null) or (e.price >= :formPrice))  " +
            "and ((:toPrice is null) or (e.price <= :toPrice)) " +
            "and ((:height is null) or (o.height.id = :height)) " +
            "and ((:size is null) or (o.size.id = :size)) " +
            "and ((:categoryId is null) or (e.category.id = :categoryId ))"
            )

    Page<Product> getPage(
            Pageable pageable,
            @Param("color") Integer color,
            @Param("formPrice") Integer formPrice,
            @Param("toPrice") Integer toPrice,
            @Param("height") Integer height,
            @Param("size") Integer size,
            @Param("categoryId") Integer categoryId

    );

    @Query(value = "SELECT p.id, p.name, SUM(od.quantity) as quantityProduct FROM order_details od \n" +
            "INNER JOIN products p ON p.id = od.product_id \n" +
            "INNER JOIN product_details pd ON pd.id = od.product_detail_id\n" +
            "GROUP BY p.id\n" +
            "ORDER BY quantityProduct DESC\n" +
            "LIMIT 15", nativeQuery = true)
    List<Object> getProduct();

    Product findByName(String name);
    @Query(value = "select * from products join order_details on products.id = order_details.product_id\n" +
            "                       join order_history oh on order_details.id = oh.order_detail_id\n" +
            "                        group by products.id order by sum(order_details.product_id) desc LIMIT 8"  ,nativeQuery = true)
    List<Product> findBySellingTop5( );

    @Query(value = "SELECT DISTINCT p.*\n" +
            "FROM products p\n" +
            "         INNER JOIN promotion_categories pc ON p.category_id = pc.category_id\n" +
            "         INNER JOIN promotions pr ON pc.promotion_id = pr.id\n" +
            "WHERE pr.status = 'AVAILABLE' AND pr.begin_date <= NOW() AND pr.end_date >= NOW()"  ,nativeQuery = true)
    List<Product> findByPromotion();
}
