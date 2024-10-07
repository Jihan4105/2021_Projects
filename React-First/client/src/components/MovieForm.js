import React, {useState, forwardRef, useImperativeHandle} from 'react';
import InputField from './InputField'

const MovieForm = ({addMovie, updateMovie}, ref) => {

    const [movieId, setMovieId] = useState('');
    const [movieTitle, setMovieTitle] = useState('');
    const [movieYear, setMovieYear] = useState('');
    const [titleError, setTitleError] = useState('');
    const [yearError, setYearError] = useState('');

    useImperativeHandle(ref, () => (
      { resetForm, initForm }
    ));

    const resetForm = (id, title, year) => {
      setMovieId(id);
      setMovieTitle(title);
      setMovieYear(year);
    }

    const validateForm = () => {
        resetErrors();
        let validated = true;
        if(!movieTitle) {
            setTitleError('영화제목을 넣어주세요.');
            validated = false;
        }

        if(!movieYear) {
            setYearError('개봉연도를 넣어주세요.');
            validated = false;
        }

        return validated;
    };

    const resetErrors = () => {
        setTitleError('');
        setYearError('');
    }

    let status = '';

    const handleAdd = () => {
      status = "Add";
    }

    const handleUpdate = () => {
      status = "Update";
    }

    const onSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        if(status === "Add") {
          addMovie({
            title: movieTitle,
            year: movieYear
          });
        }
        else if (status === "Update") {
          updateMovie({
            id: movieId,
            title: movieTitle,
            year: movieYear
          });
        }
      }
        resetErrors();
        resetForm('', '', '');
    }

    const style = {display: "none"};

    const initForm = () => {

    document.getElementById('AddBtn').style.display = "inline-block";
    document.getElementById('UpdateBtn').style.display = "none";
    document.getElementById('CancelBtn').style.display = "none";
    resetErrors();
    resetForm('', '', '');
    }

    const cancelUpdate = (e) => {
      e.preventDefault();
      initForm();
    }

    return (
        <form onSubmit={onSubmit}>
          <InputField
            type = "text"
            value = {movieTitle}
            placeholeder = "영화제목"
            onChange = {(e) => setMovieTitle(e.target.value)}
            errorMessage = {titleError}
          />
          <InputField
            type = "number"
            value = {movieYear}
            placeholeder = "개봉연도"
            onChange = {(e) => setMovieYear(e.target.value)}
            errorMessage = {yearError}
          />
          <button id = "AddBtn" type='submit' onClick = {handleAdd}>영화추가</button>
          <button id = "UpdateBtn" style = {style} type='submit' onClick = {handleUpdate}>수정</button>
          <button id = "CancelBtn" style = {style} onClick = {cancelUpdate}>수정취소</button>
        </form>
    );
};

export default forwardRef(MovieForm);