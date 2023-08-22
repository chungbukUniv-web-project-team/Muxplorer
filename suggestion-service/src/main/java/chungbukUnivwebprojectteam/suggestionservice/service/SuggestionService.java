package chungbukUnivwebprojectteam.suggestionservice.service;

import java.util.List;

import chungbukUnivwebprojectteam.suggestionservice.dto.suggestion.SuggestionRequestDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.suggestion.SuggestionResponseObjectDto;

public interface SuggestionService {
	void saveSuggestion(Long roomId, SuggestionRequestDto suggestionRequestDto);

	List<SuggestionResponseObjectDto> findAllByRoom(Long roomId);
}
