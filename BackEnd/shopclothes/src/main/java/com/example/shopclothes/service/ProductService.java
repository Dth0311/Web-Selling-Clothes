package com.example.shopclothes.service;

import com.example.shopclothes.dto.ProductDTO;
import com.example.shopclothes.entity.*;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.repository.*;
import com.example.shopclothes.response.ProductCategoryResponse;
import com.example.shopclothes.service.Imp.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductService implements IProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    SizeRepository sizeRepository;

    @Autowired
    ProductSizeRepository productSizeRepository;

    @Override
    public List<Product> getList() {
        return productRepository.findAll(Sort.by("id").descending());
    }

    @Override
    public List<Product> getListNewst(int number) {
        return productRepository.getListNewest(number);
    }

    @Override
    public List<Product> getListByPrice() {
        return productRepository.getListByPrice();
    }

    @Override
    public List<Product> findRelatedProduct(int id) {
        return productRepository.findRelatedProduct(id);
    }

    @Override
    public List<Product> getListProductByCategory(int id) {
        return productRepository.getListProductByCategory(id);
    }

    @Override
    public List<Product> getListByPriceRange(int id, int min, int max) {
        return productRepository.getListProductByPriceRange(id,min,max);
    }

    @Override
    public Page<Product> searchProduct(String keyword,PageRequest pageRequest) {
        return productRepository.searchProduct(keyword,pageRequest);
    }

    @Override
    public Product getProduct(int id) throws DataNotFoundException {
        return productRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Không tìm thấy product với id: " + id));
    }

    @Override
    public Product createProduct(ProductDTO productDTO) throws DataNotFoundException {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(()-> new DataNotFoundException("Không tìm thấy category với id: " + productDTO.getCategoryId()));
        product.setCategory(category);

        if(!productDTO.getImageIds().isEmpty()){
            Set<Image> images = new HashSet<>();
            for(int imageId: productDTO.getImageIds()){
                Image image = imageRepository.findById(imageId).orElseThrow(() -> new DataNotFoundException("Không tìm thấy image id: " + imageId));
                images.add(image);
            }
                product.setImages(images);
        }
        productRepository.save(product);
        return product;
    }

    @Override
    public Product updateProduct(int id, ProductDTO productDTO) throws DataNotFoundException {
        Product product= productRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Không tìm thấy product id: " + id));
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(()-> new DataNotFoundException("Không tìm thấy category với id: " + productDTO.getCategoryId()));
        product.setCategory(category);

        if(!productDTO.getImageIds().isEmpty()){
            Set<Image> images = new HashSet<>();
            for(int imageId: productDTO.getImageIds()){
                Image image = imageRepository.findById(imageId).orElseThrow(() -> new DataNotFoundException("Không tìm thấy image id: " + imageId));
                images.add(image);
            }
            product.setImages(images);
        }

//        if(!productDTO.getSizeIds().isEmpty()){
//            Set<Size> sizes = new HashSet<>();
//            for(int sizeId: productDTO.getSizeIds()){
//                Size size = sizeRepository.findById(sizeId).orElseThrow(() -> new DataNotFoundException("Không tìm thấy size id: " + sizeId));
//                sizes.add(size);
//            }
//            product.setSizes(sizes);
//        }

        productRepository.save(product);
        return product;
    }

    @Override
    public void deleteProduct(int id) throws DataNotFoundException {
        Product product= productRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Không tìm thấy product id: " + id));
//        if(!product.getImages().isEmpty()){
//            product.getImages().remove(this);
//        }
        productRepository.delete(product);
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> getProductByCategoryId(int categoryId ,PageRequest pageRequest) {
        Page<Product> productPage;
        productPage = productRepository.getListProductByCategory(categoryId,pageRequest);
        return productPage;
    }


}
