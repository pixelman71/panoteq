<div class="ft_newsletter">
	<div class="container">
		<div class="content_newsletter offset-lg-5">
			<div class="pos_title"><h2>{l s='Sign up to newsletter'  d='Shop.Theme.Actions'}</h2></div>
			 {if $conditions}
			  <p class="desc">{$conditions}</p>
			{/if}
			<form action="{$urls.pages.index}#footer" method="post">
				<div class="input-wrapper">
				  <input
					name="email"
					class="input_txt"
					type="text"
					value="{$value}"
					placeholder="{l s='Your email address' d='Shop.Forms.Labels'}"
				  >
				</div>
				<input
				  class="btn btn-primary"
				  name="submitNewsletter"
				  type="submit"
				  value="{l s='Submit' d='Shop.Theme.Actions'}"
				>
				<input type="hidden" name="action" value="0">
			</form>
		</div>
	</div>
</div>