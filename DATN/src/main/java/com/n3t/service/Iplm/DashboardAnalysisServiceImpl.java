package com.n3t.service.Iplm;

import com.n3t.repository.*;
import com.n3t.service.DashboardAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardAnalysisServiceImpl implements DashboardAnalysisService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private FeedbackRepository Feerepository;

    @Autowired
    private VoucherRepository voirepository;

    @Autowired
    private ProductRepository prorepository;

    @Autowired
    private UserRepository userrepository;

    @Autowired
    private BrandRepository brandrepository;



    @Override
    public Map<String, Object> dashboardAnalysis() {
        Map<String, Object> result = new HashMap<>();
        result.put("month", orderRepo.countByMonth());
        result.put("sta", orderRepo.countByCONFIRMATION());
        result.put("Phanhoi", Feerepository.findAll().size());
        result.put("khuyenmai", voirepository.countById());
        result.put("product", prorepository.countById());
        result.put("DELIVERED", orderRepo.countByDELIVERED());
        result.put("SanPhamDaBan", orderRepo.countByDaBan());
        result.put("TaiKhoan", userrepository.countById());
        result.put("nhanhieu", brandrepository.countById());
        result.put("TC",(orderRepo.countByDELIVERED())/(orderRepo.countByCONFIRMED())*100);
        return result;
    }

}
