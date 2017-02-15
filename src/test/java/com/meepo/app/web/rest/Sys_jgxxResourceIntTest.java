package com.meepo.app.web.rest;

import com.meepo.app.MeepoApp;

import com.meepo.app.domain.Sys_jgxx;
import com.meepo.app.repository.Sys_jgxxRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the Sys_jgxxResource REST controller.
 *
 * @see Sys_jgxxResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MeepoApp.class)
public class Sys_jgxxResourceIntTest {

    private static final String DEFAULT_JGBM = "AAAAAA";
    private static final String UPDATED_JGBM = "BBBBBB";

    private static final String DEFAULT_JGMC = "AAAAAAAAAA";
    private static final String UPDATED_JGMC = "BBBBBBBBBB";

    @Autowired
    private Sys_jgxxRepository sys_jgxxRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private EntityManager em;

    private MockMvc restSys_jgxxMockMvc;

    private Sys_jgxx sys_jgxx;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
            Sys_jgxxResource sys_jgxxResource = new Sys_jgxxResource(sys_jgxxRepository);
        this.restSys_jgxxMockMvc = MockMvcBuilders.standaloneSetup(sys_jgxxResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sys_jgxx createEntity(EntityManager em) {
        Sys_jgxx sys_jgxx = new Sys_jgxx()
                .jgbm(DEFAULT_JGBM)
                .jgmc(DEFAULT_JGMC);
        return sys_jgxx;
    }

    @Before
    public void initTest() {
        sys_jgxx = createEntity(em);
    }

    @Test
    @Transactional
    public void createSys_jgxx() throws Exception {
        int databaseSizeBeforeCreate = sys_jgxxRepository.findAll().size();

        // Create the Sys_jgxx

        restSys_jgxxMockMvc.perform(post("/api/sys-jgxxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sys_jgxx)))
            .andExpect(status().isCreated());

        // Validate the Sys_jgxx in the database
        List<Sys_jgxx> sys_jgxxList = sys_jgxxRepository.findAll();
        assertThat(sys_jgxxList).hasSize(databaseSizeBeforeCreate + 1);
        Sys_jgxx testSys_jgxx = sys_jgxxList.get(sys_jgxxList.size() - 1);
        assertThat(testSys_jgxx.getJgbm()).isEqualTo(DEFAULT_JGBM);
        assertThat(testSys_jgxx.getJgmc()).isEqualTo(DEFAULT_JGMC);
    }

    @Test
    @Transactional
    public void createSys_jgxxWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sys_jgxxRepository.findAll().size();

        // Create the Sys_jgxx with an existing ID
        Sys_jgxx existingSys_jgxx = new Sys_jgxx();
        existingSys_jgxx.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSys_jgxxMockMvc.perform(post("/api/sys-jgxxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(existingSys_jgxx)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Sys_jgxx> sys_jgxxList = sys_jgxxRepository.findAll();
        assertThat(sys_jgxxList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSys_jgxxes() throws Exception {
        // Initialize the database
        sys_jgxxRepository.saveAndFlush(sys_jgxx);

        // Get all the sys_jgxxList
        restSys_jgxxMockMvc.perform(get("/api/sys-jgxxes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sys_jgxx.getId().intValue())))
            .andExpect(jsonPath("$.[*].jgbm").value(hasItem(DEFAULT_JGBM.toString())))
            .andExpect(jsonPath("$.[*].jgmc").value(hasItem(DEFAULT_JGMC.toString())));
    }

    @Test
    @Transactional
    public void getSys_jgxx() throws Exception {
        // Initialize the database
        sys_jgxxRepository.saveAndFlush(sys_jgxx);

        // Get the sys_jgxx
        restSys_jgxxMockMvc.perform(get("/api/sys-jgxxes/{id}", sys_jgxx.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sys_jgxx.getId().intValue()))
            .andExpect(jsonPath("$.jgbm").value(DEFAULT_JGBM.toString()))
            .andExpect(jsonPath("$.jgmc").value(DEFAULT_JGMC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSys_jgxx() throws Exception {
        // Get the sys_jgxx
        restSys_jgxxMockMvc.perform(get("/api/sys-jgxxes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSys_jgxx() throws Exception {
        // Initialize the database
        sys_jgxxRepository.saveAndFlush(sys_jgxx);
        int databaseSizeBeforeUpdate = sys_jgxxRepository.findAll().size();

        // Update the sys_jgxx
        Sys_jgxx updatedSys_jgxx = sys_jgxxRepository.findOne(sys_jgxx.getId());
        updatedSys_jgxx
                .jgbm(UPDATED_JGBM)
                .jgmc(UPDATED_JGMC);

        restSys_jgxxMockMvc.perform(put("/api/sys-jgxxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSys_jgxx)))
            .andExpect(status().isOk());

        // Validate the Sys_jgxx in the database
        List<Sys_jgxx> sys_jgxxList = sys_jgxxRepository.findAll();
        assertThat(sys_jgxxList).hasSize(databaseSizeBeforeUpdate);
        Sys_jgxx testSys_jgxx = sys_jgxxList.get(sys_jgxxList.size() - 1);
        assertThat(testSys_jgxx.getJgbm()).isEqualTo(UPDATED_JGBM);
        assertThat(testSys_jgxx.getJgmc()).isEqualTo(UPDATED_JGMC);
    }

    @Test
    @Transactional
    public void updateNonExistingSys_jgxx() throws Exception {
        int databaseSizeBeforeUpdate = sys_jgxxRepository.findAll().size();

        // Create the Sys_jgxx

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSys_jgxxMockMvc.perform(put("/api/sys-jgxxes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sys_jgxx)))
            .andExpect(status().isCreated());

        // Validate the Sys_jgxx in the database
        List<Sys_jgxx> sys_jgxxList = sys_jgxxRepository.findAll();
        assertThat(sys_jgxxList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSys_jgxx() throws Exception {
        // Initialize the database
        sys_jgxxRepository.saveAndFlush(sys_jgxx);
        int databaseSizeBeforeDelete = sys_jgxxRepository.findAll().size();

        // Get the sys_jgxx
        restSys_jgxxMockMvc.perform(delete("/api/sys-jgxxes/{id}", sys_jgxx.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Sys_jgxx> sys_jgxxList = sys_jgxxRepository.findAll();
        assertThat(sys_jgxxList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sys_jgxx.class);
    }
}
