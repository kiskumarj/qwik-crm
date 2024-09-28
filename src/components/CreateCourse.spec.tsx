import { createDOM } from "@builder.io/qwik/testing";
import { test, expect, vi } from "vitest";
import CreateCourse from "~/routes/admin/createproduct/index";

test(`[CreateCourse Component]: Should render form fields`, async () => {
  const { screen, render } = await createDOM();
  
  // Render the CreateCourse component
  await render(<CreateCourse />);

  // Verify the form fields are present
  expect(screen.outerHTML).toContain("Course Name");
  expect(screen.outerHTML).toContain("Image link");
  expect(screen.outerHTML).toContain("Enter Video Link");
  expect(screen.outerHTML).toContain("Enter Course Detail");
  expect(screen.outerHTML).toContain("Enter Course Duration");
  expect(screen.outerHTML).toContain("Enter Teacher Name");
  expect(screen.outerHTML).toContain("Enter Course Price");
});

test(`[CreateCourse Component]: Should allow filling out the form`, async () => {
  const { screen, render, userEvent } = await createDOM();

  // Render the CreateCourse component
  await render(<CreateCourse />);

  // Simulate user input for each form field
  const courseNameInput = screen.querySelector('input[name="courseName"]') as HTMLInputElement;
  await userEvent(courseNameInput, 'input', { target: { value: 'JavaScript Basics' } });
  expect(courseNameInput.value).toBe('JavaScript Basics');

  const imageLinkInput = screen.querySelector('input[name="Image"]') as HTMLInputElement;
  await userEvent(imageLinkInput, 'input', { target: { value: 'http://example.com/image.png' } });
  expect(imageLinkInput.value).toBe('http://example.com/image.png');

  const videoLinkInput = screen.querySelector('input[name="videoLink"]') as HTMLInputElement;
  await userEvent(videoLinkInput, 'input', { target: { value: 'http://example.com/video.mp4' } });
  expect(videoLinkInput.value).toBe('http://example.com/video.mp4');

  const courseDetailInput = screen.querySelector('textarea[name="courseDetail"]') as HTMLTextAreaElement;
  await userEvent(courseDetailInput, 'input', { target: { value: 'Learn the basics of JavaScript.' } });
  expect(courseDetailInput.value).toBe('Learn the basics of JavaScript.');

  const courseDurationInput = screen.querySelector('input[name="courseDuration"]') as HTMLInputElement;
  await userEvent(courseDurationInput, 'input', { target: { value: '3 months' } });
  expect(courseDurationInput.value).toBe('3 months');

  const teacherNameInput = screen.querySelector('input[name="teacherName"]') as HTMLInputElement;
  await userEvent(teacherNameInput, 'input', { target: { value: 'John Doe' } });
  expect(teacherNameInput.value).toBe('John Doe');

  const priceInput = screen.querySelector('input[name="Price"]') as HTMLInputElement;
  await userEvent(priceInput, 'input', { target: { value: '99.99' } });
  expect(priceInput.value).toBe('99.99');
});

test(`[CreateCourse Component]: Should submit form and show success message`, async () => {
  const { screen, render, userEvent } = await createDOM();
  
  // Render the CreateCourse component
  await render(<CreateCourse />);

  // Fill the form fields
  await userEvent(screen.querySelector('input[name="courseName"]') as HTMLInputElement, 'input', { target: { value: 'JavaScript Basics' } });
  await userEvent(screen.querySelector('input[name="Image"]') as HTMLInputElement, 'input', { target: { value: 'http://example.com/image.png' } });
  await userEvent(screen.querySelector('input[name="videoLink"]') as HTMLInputElement, 'input', { target: { value: 'http://example.com/video.mp4' } });
  await userEvent(screen.querySelector('textarea[name="courseDetail"]') as HTMLTextAreaElement, 'input', { target: { value: 'Learn the basics of JavaScript.' } });
  await userEvent(screen.querySelector('input[name="courseDuration"]') as HTMLInputElement, 'input', { target: { value: '3 months' } });
  await userEvent(screen.querySelector('input[name="teacherName"]') as HTMLInputElement, 'input', { target: { value: 'John Doe' } });
  await userEvent(screen.querySelector('input[name="Price"]') as HTMLInputElement, 'input', { target: { value: '99.99' } });

  // Submit the form
  const submitButton = screen.querySelector('button[type="submit"]') as HTMLButtonElement;
  await userEvent(submitButton, 'click');

  // Assert that success message is shown
  expect(screen.outerHTML).toContain('Course created successfully');
});

test(`[CreateCourse Component]: Should show error message on failed form submission`, async () => {
  const { screen, render, userEvent } = await createDOM();

  // Mock form submission to simulate an error
  vi.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.reject('API is down'));

  // Render the CreateCourse component
  await render(<CreateCourse />);

  // Submit the form without filling it out to trigger validation
  const submitButton = screen.querySelector('button[type="submit"]') as HTMLButtonElement;
  await userEvent(submitButton, 'click');

  // Assert that an error message is shown
  expect(screen.outerHTML).toContain('Failed to create course');
});
