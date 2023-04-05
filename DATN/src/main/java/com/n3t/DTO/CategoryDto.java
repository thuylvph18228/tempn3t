package com.n3t.DTO;
import com.n3t.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {

    private Integer id;

    private String name;

    private String status;

    private User createBy;

    private User updateBy;

}
