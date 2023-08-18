package chungbukUnivwebprojectteam.suggestionservice.service;

import java.util.List;

import chungbukUnivwebprojectteam.suggestionservice.dto.proposal.ProposalCreateDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.proposal.ProposalResponseDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.proposal.ProposalResponseObjectDto;

public interface ProposalService {

	List<ProposalResponseObjectDto> findAllProposal();

	ProposalResponseDto findProposal(Long id);

	void save(ProposalCreateDto requestDto);

	void deleteProposal(Long id);
}
