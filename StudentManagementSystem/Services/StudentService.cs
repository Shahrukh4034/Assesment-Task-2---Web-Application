using StudentManagementSystem.Models;
using StudentManagementSystem.Repositories;

namespace StudentManagementSystem.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _repository;

        public StudentService(IStudentRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Student>> GetAllStudentsAsync()
        {
            return await _repository.GetAllStudentsAsync();
        }

        public async Task<Student?> GetStudentByIdAsync(int id)
        {
            return await _repository.GetStudentByIdAsync(id);
        }

        public async Task<bool> CreateStudentAsync(Student student)
        {
            
            var students = await _repository.GetAllStudentsAsync();
            if (students.Any(s => s.Email == student.Email)) return false;

            await _repository.AddStudentAsync(student);
            return true;
        }

        public async Task<bool> UpdateStudentAsync(int id, Student student)
        {
            var existingStudent = await _repository.GetStudentByIdAsync(id);
            if (existingStudent == null) return false;

            existingStudent.Name = student.Name;
            existingStudent.Age = student.Age;
            existingStudent.Course = student.Course;
            existingStudent.Email = student.Email;

            await _repository.UpdateStudentAsync(existingStudent);
            return true;
        }

        public async Task<bool> DeleteStudentAsync(int id)
        {
            var student = await _repository.GetStudentByIdAsync(id);
            if (student == null) return false;

            await _repository.DeleteStudentAsync(id);
            return true;
        }
    }
}