package com.example.mediservapi.dto.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class LoadPrescription {
    private String filename;
    private String fileType;
    private String fileSize;
    private byte[] file;

}
