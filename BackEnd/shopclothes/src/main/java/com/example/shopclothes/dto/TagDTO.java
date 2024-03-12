package com.example.shopclothes.dto;
import com.example.shopclothes.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagDTO {
    private String name;
    public static TagDTO fromTag(Tag tag){
        TagDTO tagDTO = new TagDTO();
        tagDTO.setName(tagDTO.getName());
        return tagDTO;
    }
}
