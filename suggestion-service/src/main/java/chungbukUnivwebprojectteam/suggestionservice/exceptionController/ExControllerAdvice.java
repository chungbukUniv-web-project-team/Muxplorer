package chungbukUnivwebprojectteam.suggestionservice.exceptionController;

import javax.validation.UnexpectedTypeException;

import org.springframework.context.MessageSource;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import chungbukUnivwebprojectteam.suggestionservice.exception.ErrorResult;
import chungbukUnivwebprojectteam.suggestionservice.exception.NotFoundProposalByIdException;
import chungbukUnivwebprojectteam.suggestionservice.exception.NotFoundRoomByIdException;
import chungbukUnivwebprojectteam.suggestionservice.exception.NotFoundRoomByUserIdException;
import chungbukUnivwebprojectteam.suggestionservice.exception.NotFoundSuggestionToIdAndFromIdException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ExControllerAdvice {

	private final MessageSource messageSource;

	@ExceptionHandler(UnexpectedTypeException.class)
	public ErrorResult unExpectedException(UnexpectedTypeException e) {
		String message = messageSource.getMessage("error.type", null, null);
		return new ErrorResult(message, e.getMessage());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ErrorResult methodArgumentNotValidException(MethodArgumentNotValidException e) {
		String message = messageSource.getMessage("error.method.argument", null, null);
		return new ErrorResult(message, e.getMessage());
	}

	@ExceptionHandler(NotFoundProposalByIdException.class)
	public ErrorResult notFoundProposalException(NotFoundProposalByIdException e) {
		String message = messageSource.getMessage("error.findById", null, null);
		return new ErrorResult(message, e.getMessage());
	}

	@ExceptionHandler(NotFoundRoomByUserIdException.class)
	public ErrorResult notFoundRoomUserId(NotFoundRoomByUserIdException e) {
		String message = messageSource.getMessage("error.room.userId", null, null);
		return new ErrorResult(message, e.getMessage());
	}

	@ExceptionHandler(NotFoundRoomByIdException.class)
	public ErrorResult notFoundRoomId(NotFoundRoomByIdException e) {
		String message = messageSource.getMessage("error.room.id", null, null);
		return new ErrorResult(message, e.getMessage());
	}

	@ExceptionHandler(NotFoundSuggestionToIdAndFromIdException.class)
	public ErrorResult notFoundSuggestion(NotFoundSuggestionToIdAndFromIdException e) {
		String message = messageSource.getMessage("error.suggestion.message", null, null);
		return new ErrorResult(message, e.getMessage());
	}
}
