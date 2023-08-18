package chungbukUnivwebprojectteam.suggestionservice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chungbukUnivwebprojectteam.suggestionservice.dto.proposal.ProposalCreateDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.proposal.ProposalResponseDto;
import chungbukUnivwebprojectteam.suggestionservice.dto.proposal.ProposalResponseObjectDto;
import chungbukUnivwebprojectteam.suggestionservice.service.ProposalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProposalController {

	private final ProposalService proposalService;

	@GetMapping("/get/proposal-list")
	public ResponseEntity<?> getProposalList() {
		System.out.println("ProposalController.getProposalList");
		List<ProposalResponseObjectDto> proposalList = proposalService.findAllProposal();
		return ResponseEntity.status(HttpStatus.OK).body(proposalList);
	}

	@PostMapping("/send/proposal")
	public ResponseEntity<?> sendProposal(@RequestBody @Validated ProposalCreateDto proposalRequestDto) {
		proposalService.save(proposalRequestDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/get/proposal/{id}")
	public ResponseEntity<?> getProposalById(@PathVariable Long id) {
		ProposalResponseDto proposalDto = proposalService.findProposal(id);
		return ResponseEntity.status(HttpStatus.OK).body(proposalDto);
	}

	@DeleteMapping("/delete/proposal/{id}")
	public ResponseEntity<?> deleteProposalById(@PathVariable Long id) {
		proposalService.deleteProposal(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
