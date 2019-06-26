package com.db.controllers;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import com.db.model.ClaimTemplates;
import com.db.repos.ClaimTemplatesRepo;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class EditFileTemplatesController {

    @Autowired
    private ClaimTemplatesRepo claimTemplatesRepo;

    @Value("${upload.path}")
    private String uploadPath;

    @GetMapping("/editfiletemplates")
    public String editFileTemplates (Map<String,Object> model) {

        return "editfiletemplates";
    }


    @PostMapping("handlefileupload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam String filename) throws IOException {

        ClaimTemplates claimTemplates = new ClaimTemplates();

        if(file != null && !file.getOriginalFilename().isEmpty()) {
            File uploadDir = new File(uploadPath);
                if(!uploadDir.exists()) {
                    uploadDir.mkdir();
                }

            String uuidFile = UUID.randomUUID().toString();


            // uploadPath + File.separator +
            String resultFilepath = uploadPath + File.separator + uuidFile + "." + FilenameUtils.getExtension(file.getOriginalFilename());

            file.transferTo(new File(resultFilepath));

            claimTemplates.setFilepath(resultFilepath);
            claimTemplates.setFilename(filename);
            claimTemplatesRepo.save(claimTemplates);
        }


        return "redirect:/editfiletemplates";
    }

}
