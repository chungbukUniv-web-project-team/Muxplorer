package chungbukUnivwebprojectteam.suggestionservice.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

import chungbukUnivwebprojectteam.suggestionservice.repository.ProposalRepository;
import chungbukUnivwebprojectteam.suggestionservice.repository.RoomRepository;
import chungbukUnivwebprojectteam.suggestionservice.repository.SuggestionRepository;
import chungbukUnivwebprojectteam.suggestionservice.service.ProposalService;
import chungbukUnivwebprojectteam.suggestionservice.service.ProposalServiceImpl;
import chungbukUnivwebprojectteam.suggestionservice.service.RoomService;
import chungbukUnivwebprojectteam.suggestionservice.service.RoomServiceImpl;
import chungbukUnivwebprojectteam.suggestionservice.service.SuggestionService;
import chungbukUnivwebprojectteam.suggestionservice.service.SuggestionServiceImpl;
import chungbukUnivwebprojectteam.suggestionservice.utils.IdConst;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

	private final ProposalRepository proposalRepository;
	private final RoomRepository roomRepository;
	private final IdConst idConst;

	private final SuggestionRepository suggestionRepository;

	@Bean
	public ProposalService proposalService() {
		return new ProposalServiceImpl(proposalRepository);
	}

	@Bean
	public RoomService roomService(){
		return new RoomServiceImpl(roomRepository, idConst);
	}

	@Bean
	public SuggestionService suggestionService(){
		return new SuggestionServiceImpl(roomRepository, suggestionRepository, idConst);
	}

	@Bean
	public MessageSource messageSource() {
		ResourceBundleMessageSource messageSource = new
			ResourceBundleMessageSource();
		messageSource.setBasenames("messages", "errors");
		messageSource.setDefaultEncoding("utf-8");
		return messageSource;
	}
}
