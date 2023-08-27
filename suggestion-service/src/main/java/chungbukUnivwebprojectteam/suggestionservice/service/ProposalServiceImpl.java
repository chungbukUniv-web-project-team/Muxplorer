package chungbukUnivwebprojectteam.suggestionservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import chungbukUnivwebprojectteam.suggestionservice.domain.ProposalEntity;
import chungbukUnivwebprojectteam.suggestionservice.dto.proposal.ProposalCreateDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.proposal.ProposalResponseDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.proposal.ProposalResponseObjectDto;
import chungbukUnivwebprojectteam.suggestionservice.exception.NotFoundProposalByIdException;
import chungbukUnivwebprojectteam.suggestionservice.repository.ProposalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class ProposalServiceImpl implements ProposalService {

	private final ProposalRepository proposalRepository;

	@Override
	public List<ProposalResponseObjectDto> findAllProposal() {
		List<ProposalEntity> proposalEntities = proposalRepository.findAll();
		return proposalEntities.stream()
			.map(proposalEntity -> new ProposalResponseObjectDto(proposalEntity.getId(), proposalEntity.getTitle(),
				proposalEntity.getContent(), proposalEntity.getCreatedAt()))
			.collect(Collectors.toList());
	}

	@Override
	public ProposalResponseDto findProposal(Long id) {
		ProposalEntity proposal = proposalRepository.findById(id).orElse(null);
		if (proposal == null) {
			throw new NotFoundProposalByIdException("Id를 통해 찾을 수 없습니다");
		}
		ProposalResponseDto proposalResponseDto = new ProposalResponseDto(proposal.getId(), proposal.getTitle(),
			proposal.getContent(), proposal.getCreatedAt());
		return proposalResponseDto;
	}

	@Override
	public void save(@Validated ProposalCreateDto requestDto) {
		ProposalEntity proposalEntity = ProposalEntity.builder()
			.userId(requestDto.getUserId())
			.title(requestDto.getTitle())
			.content(requestDto.getContent())
			.createdAt(requestDto.getCreatedAt())
			.build();

		proposalRepository.save(proposalEntity);

	}

	@Override
	@Transactional
	public void deleteProposal(Long id) {
		proposalRepository.deleteById(id);
	}

}
