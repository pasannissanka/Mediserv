package com.example.mediservapi.dto.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class FileResponse {
    private String mimeType;
    private String id;
    private String fileName;
}
