package com.example.mediservapi.controller.request;

import com.example.mediservapi.dto.model.Page;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data @AllArgsConstructor @NoArgsConstructor
public class SearchRequest<T> {

    public SearchRequest(T query) {
        this.page = new Page();
        this.query = query;
    }

    @Valid
    @NotNull
    private Page page;

    @Valid
    @NotNull
    private T query;

}