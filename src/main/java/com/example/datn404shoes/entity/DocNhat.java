package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.Builder;

import java.util.Objects;

@Entity
@Table(name = "doc_nhat", schema = "dbo", catalog = "ShopShoe")
@Builder
public class DocNhat {
    private long id;
    private Long sanPhamId;
    private String thuocTinhDocNhat;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "san_pham_id", nullable = true)
    public Long getSanPhamId() {
        return sanPhamId;
    }

    public void setSanPhamId(Long sanPhamId) {
        this.sanPhamId = sanPhamId;
    }

    @Basic
    @Column(name = "thuoc_tinh_doc_nhat", nullable = true, length = 255)
    public String getThuocTinhDocNhat() {
        return thuocTinhDocNhat;
    }

    public void setThuocTinhDocNhat(String thuocTinhDocNhat) {
        this.thuocTinhDocNhat = thuocTinhDocNhat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DocNhat docNhat = (DocNhat) o;
        return id == docNhat.id && Objects.equals(sanPhamId, docNhat.sanPhamId) && Objects.equals(thuocTinhDocNhat, docNhat.thuocTinhDocNhat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sanPhamId, thuocTinhDocNhat);
    }
}
