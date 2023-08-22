package chungbukUnivwebprojectteam.suggestionservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chungbukUnivwebprojectteam.suggestionservice.domain.ProposalEntity;

@Repository
public interface ProposalRepository extends JpaRepository<ProposalEntity, String> {

	List<ProposalEntity> findAll();

	Optional<ProposalEntity> findById(Long id);

	void deleteById(Long id);
}
