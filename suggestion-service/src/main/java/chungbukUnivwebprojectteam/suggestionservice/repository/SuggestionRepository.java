package chungbukUnivwebprojectteam.suggestionservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import chungbukUnivwebprojectteam.suggestionservice.domain.SuggestionEntity;

public interface SuggestionRepository extends JpaRepository<SuggestionEntity, String> {

}
