package com.meepo.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Sys_jgxx.
 */
@Entity
@Table(name = "sys_jgxx")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Sys_jgxx implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 6)
    @Column(name = "jgbm", length = 6)
    private String jgbm;

    @Size(max = 60)
    @Column(name = "jgmc", length = 60)
    private String jgmc;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJgbm() {
        return jgbm;
    }

    public Sys_jgxx jgbm(String jgbm) {
        this.jgbm = jgbm;
        return this;
    }

    public void setJgbm(String jgbm) {
        this.jgbm = jgbm;
    }

    public String getJgmc() {
        return jgmc;
    }

    public Sys_jgxx jgmc(String jgmc) {
        this.jgmc = jgmc;
        return this;
    }

    public void setJgmc(String jgmc) {
        this.jgmc = jgmc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Sys_jgxx sys_jgxx = (Sys_jgxx) o;
        if (sys_jgxx.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, sys_jgxx.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Sys_jgxx{" +
            "id=" + id +
            ", jgbm='" + jgbm + "'" +
            ", jgmc='" + jgmc + "'" +
            '}';
    }
}
